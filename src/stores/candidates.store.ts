import { observable, flow, configure, action, computed, set, runInAction } from 'mobx';
import apiService from 'services/api.service';
import { getCandidateScore } from 'helpers/score.helper';
import Validate from 'helpers/validation.helper';

configure({ enforceActions: 'observed' });

const defaultValidation = {
  isValid: true,
  validationErrors: {}
};

const fieldsToValidate = {
  email: 'email',
  password: 'password'
};

class CandidatesStore {
  @observable loading = false;
  @observable candidates: any[] = [];
  @observable newCandidate: any = {};
  @observable newCandidateValidation: any = defaultValidation;
  @observable errors: [] = [];

  @computed get submitedCount() {
    return this.candidates.filter(candidate => candidate.state === 'submitted').length;
  }

  @action.bound
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action.bound
  validateNewCandidate() {
    const { isValid, errors } = Validate(this.newCandidate, fieldsToValidate);
    this.newCandidateValidation = {
      isValid,
      validationErrors: errors || {}
    };
  }

  @action.bound
  clearNewCandidate() {
    this.newCandidate = {};
    this.newCandidateValidation = defaultValidation;
  }

  @action.bound
  handleChangeNewCandidate({ field, value }: { field: string; value: any }) {
    this.newCandidate[field] = value || null;
    this.validateNewCandidate();
  }

  @action.bound
  handleUploadCandidateAvatar(event: any) {
    try {
      const files = event.target.files || [];
      if (files && files[0]) {
        const file = files[0];
        if (file.size >= 300000) {
          set(this.newCandidateValidation.validationErrors, 'avatar', 'Image size is too large');
          return;
        }
        const FR = new FileReader();
        FR.addEventListener('load', (e: any) => {
          runInAction(() => {
            set(this.newCandidateValidation.validationErrors, 'avatar', null);
            set(this.newCandidate, 'avatar', e.target.result);
          });
        }); 
        
        FR.readAsDataURL(file);
      }
    } catch (error) {
      this.errors = error.errors;
    }
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

  addNewCandidate = flow(function* fetch(this: any) {
    this.loading = true;
    try {
      const { item } = yield apiService.createCandidate(this.newCandidate);
      const [serialized] = this.serializeCandidates([item]);
      this.candidates.push(serialized);
      this.clearNewCandidate();
      this.errors = [];
      this.loading = false;
      return item;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })

  updateCandidate = flow(function* fetch(this: any, id: string, data: any) {
    this.loading = true;
    try {
      const { item } = yield apiService.updateCandidate(id, data);
      const idx = this.candidates.findIndex((candidate: any) => candidate.id === id);
      if (idx !== -1) {
        const [serialized] = this.serializeCandidates([item]);
        set(this.candidates, idx, serialized);
      }
      this.errors = [];
      this.loading = false;
      return item;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })

  deleteCandidate = flow(function* fetch(this: any, id: string) {
    this.loading = true;
    try {
      const { item } = yield apiService.deleteCandidate(id);
      const idx = this.candidates.findIndex((candidate: any) => candidate.id === id);
      if (idx !== -1) this.candidates.splice(idx, 1);
      this.errors = [];
      this.loading = false;
      return item;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })
}

export default new CandidatesStore();
