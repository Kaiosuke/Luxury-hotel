import MotionWrapper from "@/app/_components/MotionWrapper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import data from "../../data.json";

const Rooms = () => {
  const { views } = data;

  return (
    <section className="padding-main text-white">
      <div className="grid lg:grid-cols-3 gap-6 grid-cols-1">
        {views.map((view) => (
          <MotionWrapper key={view.id}>
            <Link href="#!" className="relative group/view cursor-pointer">
              <AspectRatio
                ratio={8 / 10}
                className="bg-muted overflow-hidden overlay"
              >
                <Image
                  src={view.image}
                  alt={view.title}
                  fill
                  className="h-full w-full object-cover group-hover/view:scale-110 animation-slow"
                />
              </AspectRatio>

              <div className="absolute top-1/2 px-10 text-center group-hover/view:translate-y-[-100px] animation-slow z-[2]">
                <h4 className="text-size-5xl">{view.title}</h4>
                <p className="opacity-0 group-hover/view:opacity-100 animation-slow select-none pt-4">
                  {view.description}
                </p>
              </div>
            </Link>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
};

export default Rooms;
