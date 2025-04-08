import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      Agent Portal
      <Link href="/en/agent/properties">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Go to Properties
        </button>
      </Link>
    </div>
  );
};

export default Page;
