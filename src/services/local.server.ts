import candidates from 'data/candidates.json';

const DATABASE_KEY = 'database';

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
        const data = localStorage.getItem(`${DATABASE_KEY}${url}`) || '[]';
        imitateHttpResponseTimeout(() => {
          res({ data: JSON.parse(data) });
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
        }
        localStorage.setItem(`${DATABASE_KEY}${url}`, JSON.stringify(arr));
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
