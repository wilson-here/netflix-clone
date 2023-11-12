import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  // getServerSideProps để fetch data trước khi render html
  // getServerSideProps là 1 phần của nextjs sẽ được tự động gọi trước khi component được render mà không cần call
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center min-h-[100vh]">
      <div className="flex flex-col">
        <h1 className="text-3xl lg:text-5xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10 lg:mt-20">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div className="w-28 h-28 lg:w-44 lg:h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden mx-auto">
                <img src="/images/default-blue.png" alt="" />
              </div>
              <div className="mt-2 lg:mt-4 text-gray-400 text-lg lg:text-2xl text-center group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
