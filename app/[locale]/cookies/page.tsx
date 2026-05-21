import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export const metadata = legalMetadata('cookies');

export default function Page() {
  return renderLegalPage('cookies');
}
