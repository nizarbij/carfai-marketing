import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export const metadata = legalMetadata('privacy');

export default function Page() {
  return renderLegalPage('privacy');
}
