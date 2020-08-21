import candidates from 'data/candidates.json';
import moment from 'moment';

const DATABASE_KEY = 'database';
const DATE_FORMAT = 'DD.MM.YYYY hh:mm:ss a';

const imitateHttpResponseTimeout = (callback: () => any) => {
  setTimeout(() => {
    callback();
  }, 300 + Math.round( Math.random() * 1000 ));
};

class LocalServer {
  constructor () {
    const storedCandidates = localStorage.getItem(`${DATABASE_KEY}/candidates`);
    if (!storedCandidates) {
      localStorage.setItem(`${DATABASE_KEY}/candidates`, JSON.stringify(candidates));
    }
  }

  get(url: string) {
    return new Promise((res, rej) => {
      try {
        let data = localStorage.getItem(`${DATABASE_KEY}${url}`) || '[]';
        data = JSON.parse(data).sort((a: any, b: any) => {
          return moment(b.appliedOn, DATE_FORMAT).valueOf() - moment(a.appliedOn, DATE_FORMAT).valueOf();
        });
        imitateHttpResponseTimeout(() => {
          res({ data });
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  post(url: string, body: any) {
    return new Promise((res, rej) => {
      try {
        const data = localStorage.getItem(`${DATABASE_KEY}${url}`) || '[]';
        const arr = JSON.parse(data) || [];
        const id = 'candidate_' + Math.random().toString(36).substr(2, 9);
        const item = { ...body, id, state: 'submitted', appliedOn: moment.utc().format(DATE_FORMAT) };
        arr.push(item);
        localStorage.setItem(`${DATABASE_KEY}${url}`, JSON.stringify(arr));
        imitateHttpResponseTimeout(() => {
          res({ data: arr, item });
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  patch(url: string, id: string, body: any) {
    return new Promise((res, rej) => {
      try {
        const data = localStorage.getItem(`${DATABASE_KEY}${url}`) || '[]';
        const arr = JSON.parse(data) || [];
        const idx = arr.findIndex((item: any) => item.id === id);
        let item = arr[idx];
        if (idx !== -1) {
          item = { ...item, ...body };
          arr[idx] = item;
          localStorage.setItem(`${DATABASE_KEY}${url}`, JSON.stringify(arr));
        }
        imitateHttpResponseTimeout(() => {
          res({ data: arr, item });
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  delete(url: string, id: string) {
    return new Promise((res, rej) => {
      try {
        const data = localStorage.getItem(`${DATABASE_KEY}${url}`) || '[]';
        const arr = JSON.parse(data) || [];
        const idx = arr.findIndex((item: any) => item.id === id);
        const item = arr[idx];
        if (idx !== -1) {
          arr.splice(idx, 1);
          localStorage.setItem(`${DATABASE_KEY}${url}`, JSON.stringify(arr));
        }
        imitateHttpResponseTimeout(() => {
          res({ data: arr, item });
        });
      } catch (e) {
        rej(e);
      }
    });
  }

}

export default new LocalServer();
