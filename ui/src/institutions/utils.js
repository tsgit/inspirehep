import { List } from 'immutable';
import { makeCompliantMetaDescription } from '../common/utils';

export function getPapersQueryString(recordId) {
  return `authors.affiliations.record.$ref:${recordId}`;
}

function getAddressText(address) {
  const placeName = address.get('place_name');
  const city = address.getIn(['cities', 0]);
  const state = address.get('state');
  const country = address.get('country');
  const addressElements = [placeName, city, state, country];
  const addressText = addressElements.filter(Boolean).join(', ');
  return addressText;
}

function getInstitutionHierarchiesText(hierarchy) {
  const name = hierarchy.get('name');
  const acronym = hierarchy.get('acronym');
  const hierarchyElements = [name, acronym ? `(${acronym})` : null];
  const hierarchyText = hierarchyElements.filter(Boolean).join(' ');
  return hierarchyText;
}

const ITEM_SEPARATOR = ' and ';
export function getInstitutionMetaDescription(institution) {
  const legacyICNText = institution.get('legacy_ICN');
  const institutionHierarchiesText = institution
    .get('institution_hierarchy', List())
    .map(hierarchy => getInstitutionHierarchiesText(hierarchy))
    .filter(Boolean)
    .join(ITEM_SEPARATOR);
  const addressText = institution
    .get('addresses', List())
    .map(address => getAddressText(address))
    .filter(Boolean)
    .join(ITEM_SEPARATOR);

  const sentences = [legacyICNText, institutionHierarchiesText, addressText];

  const description = sentences.filter(Boolean).join('. ');

  return makeCompliantMetaDescription(description);
}