import { ScrollArea } from "./components/ui/react-scroll-area";
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center w-full h-full bg-white gap-y-3.5">
    <div className="w-full flex items-center justify-center">
      <ScrollArea className="h-[200px] w-[350px] rounded-md  p-4">
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king&apos;s pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn&apos;t help but laugh. And once they
        started laughing, they couldn&apos;t stop.
      </ScrollArea>
    </div>
    <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white pb-4">
      <div className="bg-white rounded-sm border-gray-500 shadow-md shadow-black w-3/6 h-20 flex">
        <input type="text" className="flex-1 top-0 left-0 mt-0 disabled "/>
        <ArrowUpRight className="flex justify-center align-baseline hover:scale-105" />
      </div>
    </div>
   </div>
  );
}
