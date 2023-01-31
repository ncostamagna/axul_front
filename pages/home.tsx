import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <AppMenu></AppMenu>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4  gap-4">
          <div className="rounded shadow-sm py-4 px-4">
            <div>
              <div className="col-9">
                <h5 className="mb-0">Nahuel Costamagna</h5>
                <span className="small text-muted h5"></span>
              </div>
              <div className="col-3">data</div>
            </div>
          </div>

          <div className="rounded shadow-sm py-4 px-4">
            <div>
              <div className="col-9">
                <h5 className="mb-0">Nahuel Costamagna</h5>
                <span className="small text-muted h5"></span>
              </div>
              <div className="col-3">data</div>
            </div>
          </div>

          <div className="rounded shadow-sm py-4 px-4">
            <div>
              <div className="col-9">
                <h5 className="mb-0">Nahuel Costamagna</h5>
                <span className="small text-muted h5"></span>
              </div>
              <div className="col-3">data</div>
            </div>
          </div>

          <div className="rounded shadow-sm py-4 px-4">
            <div>
              <div className="col-9">
                <h5 className="mb-0">Nahuel Costamagna</h5>
                <span className="small text-muted h5"></span>
              </div>
              <div className="col-3">data</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
