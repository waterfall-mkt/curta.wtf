import ErrorLayout from '@/components/layouts/error';

export default function NotFoundPage() {
  return <ErrorLayout statusCode={404} />;
}
