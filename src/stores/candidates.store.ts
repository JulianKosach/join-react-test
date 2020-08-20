import { observable, flow, configure, action, computed } from 'mobx';
import apiService from 'services/api.service';

configure({ enforceActions: 'observed' });

class CandidatesStore {
  @observable loading = false;
  @observable candidates: any[] = [];
  @observable errors: [] = [];

  @computed get submitedCount() {
    return this.candidates.filter(candidate => candidate.state === 'submitted').length;
  }

  @action.bound
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  fetchAllCandidates = flow(function* fetch(this: any) {
    this.loading = true;
    try {
      const { data } = yield apiService.fetchCandidates();
      this.candidates = data;
      this.errors = [];
      this.loading = false;
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })
}

export default new CandidatesStore();
