import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export const metadata = legalMetadata('ai-disclosure');

export default function Page() {
  return renderLegalPage('ai-disclosure');
}
