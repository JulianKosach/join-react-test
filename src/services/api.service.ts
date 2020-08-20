import localServer from 'services/local.server';

class ApiService {
  fetchCandidates() {
    return localServer.get('/candidates');
  }
}

export default new ApiService();
