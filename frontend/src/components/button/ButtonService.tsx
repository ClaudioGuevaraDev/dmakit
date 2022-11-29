import ButtonLoading from "./ButtonLoading";

interface Props {
  loading: boolean;
  serviceFunction: () => void;
}

function ButtonService({ loading, serviceFunction }: Props) {
  return (
    <>
      {loading ? (
        <ButtonLoading />
      ) : (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={serviceFunction}
        >
          Run Service
        </button>
      )}
    </>
  );
}

export default ButtonService;
