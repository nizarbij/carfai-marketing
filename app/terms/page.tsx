import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export const metadata = legalMetadata('terms');

export default function Page() {
  return renderLegalPage('terms');
}
