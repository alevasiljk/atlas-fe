import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, distinctUntilChanged } from 'rxjs';
import { DashboardFilter } from '../models/dashboard-filter.model';
import { DashboardState } from './dashboard.state';

const DEFAULT_FILTER: DashboardFilter = {
  page: 0,
  pageSize: 20,
  sort: 'desc',
};

const INITIAL_STATE: DashboardState = {
  filter: DEFAULT_FILTER,
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private readonly stateSubject =
    new BehaviorSubject<DashboardState>(INITIAL_STATE);

  readonly state$: Observable<DashboardState> =
    this.stateSubject.asObservable();

  get snapshot(): DashboardState {
    return this.stateSubject.value;
  }

  updateFilter(partial: Partial<DashboardFilter>): void {
    const current = this.snapshot.filter;

    const shouldResetPage = Object.keys(partial).some(
      key => key !== 'page'
    );

    const nextFilter: DashboardFilter = {
      ...current,
      ...partial,
      page: shouldResetPage ? 0 : current.page,
    };

    this.patchState({ filter: nextFilter });
  }

  setLoading(loading: boolean): void {
    this.patchState({ loading });
  }

  private patchState(partial: Partial<DashboardState>): void {
    this.stateSubject.next({
      ...this.snapshot,
      ...partial,
    });
  }
  
  onFilterChange$(): Observable<DashboardFilter> {
  return this.state$.pipe(
    map(state => state.filter),
    distinctUntilChanged()
  );
}
}