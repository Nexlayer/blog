import Notfound from "../../public/not-found.svg";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pb-20 pt-32 flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex flex-col items-center">
        <Image className="size-[200px] sm:size-[250px]" src={Notfound} alt="Not Found" />
        <div
          className="lg:-mt-10 text-[100px] md:text-[130px] lg:text-[150px] xl:text-[170px] font-bold 
                  bg-gradient-to-b from-[#1EB8CD] to-black bg-clip-text text-transparent"
        >
          404
        </div>
        <p className="-mt-16 sm:-mt-20 lg:-mt-28 text-xl lg:text-2xl xl:text-3xl font-medium text-center">
          OOps!
          <br /> Page Not Found
        </p>
        <p className="mt-4 px-6 max-w-[380px] mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-[#878593] text-center">
          Sorry about that! Please visit our homepage to get where you need to
          go.
        </p>
        <Link href="/">
          <button className="mt-4 px-4 py-2 rounded-lg text-black bg-[#1EB8CD] hover:opacity-80">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}
