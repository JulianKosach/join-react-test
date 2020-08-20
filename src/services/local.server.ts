import candidates from 'data/candidates.json';

const DATABASE_KEY = 'database';

const imitateHttpResponseTimeout = (callback: () => any) => {
  setTimeout(() => {
    callback();
  }, Math.round( Math.random() * 1000 ));
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
        const data = localStorage.getItem(`${DATABASE_KEY}${url}`) || '';
        imitateHttpResponseTimeout(() => {
          res({ data: JSON.parse(data) });
        });
      } catch (e) {
        rej(e);
      }
    });
  }

}

export default new LocalServer();
