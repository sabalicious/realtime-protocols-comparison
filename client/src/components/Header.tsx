import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  startExperiment,
  stopExperiment,
} from "../store/slices/experimentSlice";
import { resetMetrics } from "../store/slices/metricsSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isActive = useSelector((state: RootState) => state.experiment.isActive);

  const handleToggle = () => {
    if (isActive) {
      dispatch(stopExperiment());
      dispatch(resetMetrics("polling"));
      dispatch(resetMetrics("sse"));
      dispatch(resetMetrics("websocket"));
    } else {
      dispatch(startExperiment());
    }
  };

  return (
    <header className="border-b border-gray-700 bg-gray-900 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            Realtime Protocols Comparison
          </h1>
          <p className="text-sm text-gray-400">Polling vs SSE vs WebSocket</p>
        </div>
        <button
          onClick={handleToggle}
          className={`rounded-md px-6 py-2 font-medium transition-colors ${
            isActive
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isActive ? "Stop" : "Start"}
        </button>
      </div>
    </header>
  );
};

export default Header;
