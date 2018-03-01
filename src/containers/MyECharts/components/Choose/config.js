
import 'isomorphic-fetch';
import { safeLoad } from 'js-yaml';

// const { chooseType } = context.chart.toJS(); // EChart 组件需要的 option

export const configResolve = (charts, name) => (
  fetch(`/assets/${charts}/${name}.yml`).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.text();
  }).then(config => safeLoad(config))
);
