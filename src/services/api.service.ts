import localServer from 'services/local.server';

class ApiService {
  fetchCandidates() {
    return localServer.get('/candidates');
  }

  deleteCandidate(id: string) {
    return localServer.delete('/candidates', id);
  }
}

export default new ApiService();
