import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export const metadata = legalMetadata('aup');

export default function Page() {
  return renderLegalPage('aup');
}
