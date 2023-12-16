import CourseProgressionTableSkeleton from './(components)/table-skeleton';

export default function LoadingPage() {
  return (
    <div className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:gap-6 lg:px-20">
      <CourseProgressionTableSkeleton />
    </div>
  );
}
