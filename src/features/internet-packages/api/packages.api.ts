import { api } from '../../../shared/api/axios-conf';
import type { InternetPackage } from '../types/package.types';

export const packagesApi = { getAll: async () => (await api.get<InternetPackage[]>('/internetPackages')).data };
