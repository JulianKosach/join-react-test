import localServer from 'services/local.server';

class ApiService {
  fetchCandidates() {
    return localServer.get('/candidates');
  }

  updateCandidate(id: string, data: any) {
    return localServer.patch('/candidates', id, data);
  }

  deleteCandidate(id: string) {
    return localServer.delete('/candidates', id);
  }
}

export default new ApiService();
