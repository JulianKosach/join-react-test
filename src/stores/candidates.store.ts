import { observable, flow, configure, action, computed, set } from 'mobx';
import apiService from 'services/api.service';
import { getCandidateScore } from 'helpers/score.helper';

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

  serializeCandidates(candidates: any[]) {
    return candidates.map((item: any) => ({
      ...item,
      score: getCandidateScore(item)
    }));
  }

  fetchAllCandidates = flow(function* fetch(this: any) {
    this.loading = true;
    try {
      const { data } = yield apiService.fetchCandidates();
      this.candidates = this.serializeCandidates(data);
      this.errors = [];
      this.loading = false;
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })

  updateCandidate = flow(function* fetch(this: any, id: string, data: any) {
    this.loading = true;
    try {
      yield apiService.updateCandidate(id, data);
      const idx = this.candidates.findIndex((candidate: any) => candidate.id === id);
      if (idx !== -1) {
        const item = this.candidates[idx];
        set(this.candidates, idx, { ...item, ...data });
      }
      this.errors = [];
      this.loading = false;
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })

  deleteCandidate = flow(function* fetch(this: any, id: string) {
    this.loading = true;
    try {
      yield apiService.deleteCandidate(id);
      const idx = this.candidates.findIndex((candidate: any) => candidate.id === id);
      if (idx !== -1) this.candidates.splice(idx, 1);
      this.errors = [];
      this.loading = false;
      return 
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })
}

export default new CandidatesStore();
