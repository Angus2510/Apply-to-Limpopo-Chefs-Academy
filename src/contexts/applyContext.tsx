"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  NewApplyInitialValuesType,
  newApplyInitialValuesSchema,
} from "@/schemas";

const defaultApply: NewApplyInitialValuesType = {
  emailAddress: "",
  studentName: "",
  studentSurname: "",
  phone: "",
  studentIdNumber: "",
  studentGender: "Male",
  studentAddress: "",
  studentCity: "",
  studentProvince: "",
  studentPostalCode: "",
  guardianEmail: "",
  guardianPhone: "",
  guardianName: "",
  guardianSurname: "",
  guardianRelation: "Mother",
  attendingSchool: false,
  highestGrade: "",
  passedYear: "",
  subjects: "",
  choiceOfCourse:
    "Award: Introduction to the Hospitality Industry & Cooking - 05 Months",
  campusChoice: "Mokopane",
  intake: "January",
  needAccommodation: false,
  accommodationOption: "",
  accommodation: "",
  fileName: "",
  fileType: "",
};

const LOCAL_STORAGE_KEY = "multi-step-form-demo-newApplyData";

type AddApplyContextType = {
  newApplyData: NewApplyInitialValuesType;
  updateNewApplyDetails: (
    applyDetails: Partial<NewApplyInitialValuesType>
  ) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
};

export const AddApplyContext = createContext<AddApplyContextType | null>(null);

export const AddApplyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newApplyData, setNewApplyData] =
    useState<NewApplyInitialValuesType>(defaultApply);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(newApplyData);
    }
  }, [newApplyData, dataLoaded]);

  const updateNewApplyDetails = useCallback(
    (applyDetails: Partial<NewApplyInitialValuesType>) => {
      setNewApplyData({ ...newApplyData, ...applyDetails });
    },
    [newApplyData]
  );

  const saveDataToLocalStorage = (
    currentApplyData: NewApplyInitialValuesType
  ) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentApplyData));
  };

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!loadedDataString) return setNewApplyData(defaultApply);
    const validated = newApplyInitialValuesSchema.safeParse(
      JSON.parse(loadedDataString)
    );

    if (validated.success) {
      setNewApplyData(validated.data);
    } else {
      setNewApplyData(defaultApply);
    }
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setNewApplyData(defaultApply);
  };

  const contextValue = useMemo(
    () => ({
      newApplyData,
      dataLoaded,
      updateNewApplyDetails,
      resetLocalStorage,
    }),
    [newApplyData, dataLoaded, updateNewApplyDetails]
  );

  return (
    <AddApplyContext.Provider value={contextValue}>
      {children}
    </AddApplyContext.Provider>
  );
};

export function useAddApplyContext() {
  const context = useContext(AddApplyContext);
  if (context === null) {
    throw new Error(
      "useAddApplyContext must be used within a AddApplyContextProvider"
    );
  }
  return context;
}
