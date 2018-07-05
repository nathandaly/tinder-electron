/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const path = require('path');
  const url = require('url');
  const iconUrl = url.format({
    pathname: path.join(__dirname, 'resources/icon.icns'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow = new BrowserWindow({
    show: false,
    width: 480,
    height: 800,
    resizable: true,
    icon: iconUrl
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Code to create fb authentication window
  ipcMain.on('auth-component-did-mount', () => {
    ipcMain.on('fb-authenticate', () => {
      const options = {
        client_id: '464891386855067',
        redirect_uri: 'https://tinder.com',
        scope:
          'user_birthday,user_photos,user_education_history,email,user_relationship_details,user_friends,user_work_history,user_likes'
      };

      const authWindow = new BrowserWindow({
        frame: true,
        alwaysOnTop: true,
        parent: mainWindow,
        webPreferences: { nodeIntegration: false }
      });

      const facebookAuthURL = `https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=${
        options.redirect_uri
      }&state={"challenge":"IUUkEUqIGud332lfu%2BMJhxL4Wlc%3D","0_auth_logger_id":"30F06532-A1B9-4B10-BB28-B29956C71AB1","com.facebook.sdk_client_state":true,"3_method":"sfvc_auth"}&scope=${
        options.scope
      }&response_type=token,signed_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=${
        options.client_id
      }&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd`;

      authWindow.loadURL(facebookAuthURL);
      authWindow.show();
      authWindow.webContents.on(
        'did-get-redirect-request',
        (event, oldUrl, newUrl) => {
          authWindow.destroy();
          const rawCode = /access_token=([^&]*)/.exec(newUrl) || null;
          const accessToken = rawCode && rawCode.length > 1 ? rawCode[1] : null;
          const error = /\?error=(.+)$/.exec(newUrl);
          console.log(error);

          if (accessToken !== null) {
            mainWindow.webContents.send('facebook-auth-is-success', {
              facebook_id: options.client_id,
              facebook_token: accessToken
            });
          }
        }
      );
    });
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
