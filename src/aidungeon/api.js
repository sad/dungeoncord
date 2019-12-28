const axios = require('axios').default;
const { logger } = require('../logger');

const path = 'https://api.aidungeon.io';
const viewPath = 'http://beta.aidungeon.io/stories';

module.exports = {
  dungeon: {
    connect(token, ua) {
      this.token = token;
      logger.info(`Connecting to api.aidungeon.io with token ${token}`);
      axios.defaults.headers.common['x-access-token'] = token;
      axios.defaults.headers.common['user-agent'] = ua;
      // axios.defaults.headers.common['if-none-match'] = 'W/"fc5-g1DiN5rHZN9RRyF8Z0lbCHL35mU"';
      this.updateSession();
    },

    updateSession() {
      axios.get(`${path}/sessions`).then((res) => {
        if (res.status === 200) {
          this.status = true;
          this.session = res.data[0].id;
          logger.info(`Connected: ${res.status} ${res.statusText}`);
          logger.info(`Logged in as UID ${res.data[0].userId}`);
          logger.info(`Current Session ID: ${res.data[0].id}`);
        } else {
          logger.error('Could not get session info.');
        }
      }).catch((error) => {
        logger.err(error);
        this.status = false;
      });
    },

    getPublicId() {
      return new Promise((resolve, reject) => {
        if (!this.session) {
          logger.err('Could not get the public ID because no session exists.');
          return reject(new Error('No session exists.'));
        }

        axios.get(`${path}/sessions`).then((res) => {
          if (res.status !== 200) return reject(new Error(`Could not retrieve sessions (${res.status})`));
          return resolve(`${viewPath}/${res.data[0].storyPublicId}`);
        });
      });
    },

    getPremise() {
      return new Promise((resolve, reject) => {
        if (!this.session) {
          logger.error('Can\'t get any data without a session, try `updateSession`.');
          return reject(new Error('No session ID.'));
        }

        axios.get(`${path}/sessions`).then((res) => {
          if (res.status !== 200) return reject(new Error(`Could not retrieve session (${res.status})`));
          resolve(res.data[0].story[0].value);
        });
      });
    },

    getHistory() {
      return new Promise((resolve, reject) => {
        if (!this.session) {
          logger.error('Can\'t get any data without a session, try `updateSession`.');
          return reject(new Error('No session ID.'));
        }

        axios.get(`${path}/sessions`).then((res) => {
          if (res.status !== 200) return reject(new Error(`Could not retrieve session (${res.status})`));
          return resolve({
            input: res.data[0].story[1],
            output: res.data[0].story[2],
          });
        });
      });
    },

    send(message) {
      return new Promise((resolve, reject) => {
        if (!this.session) {
          logger.error('Can\'t send a message to the server without a session, try `updateSession`.');
          return reject(new Error('No session ID.'));
        }

        axios.post(`${path}/sessions/${this.session}/inputs`, {
          text: message,
        }).then((res) => {
          const output = res.data[res.data.length - 1];
          return resolve(output.value);
        });
      });
    },
  },
};
