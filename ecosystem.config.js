module.exports = {
  apps: [
    {
      name: 'ble',
      script: './index.js',
      env: {
        BLENO_DEVICE_NAME: 'MiC test',
        BLENO_ADVERTISING_INTERVAL: 500,
        NODE_ENV: 'production',
      },
    },
  ],
}
