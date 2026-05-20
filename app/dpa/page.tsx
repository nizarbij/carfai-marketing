import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export const metadata = legalMetadata('dpa');

export default function Page() {
  return renderLegalPage('dpa');
}
