import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetMedicalRequest,
  GetMovementWardRequest,
  MedicalStockMovementTypeApi,
  MedicalStockWardApi,
  MedicalTypesApi,
  MedicalsApi,
  MovementDTO,
  MovementWardDTO,
  NewMedicalRequest,
  NewMultipleChargingMovementsRequest,
  NewMultipleDischargingMovementsRequest,
  StockMovementsApi,
  UpdateMedicalRequest,
} from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";

const api = new StockMovementsApi(customConfiguration());
const movementTypeApi = new MedicalStockMovementTypeApi(customConfiguration());
const wardStockApi = new MedicalStockWardApi(customConfiguration());
const medicalApi = new MedicalsApi(customConfiguration());
const medicalTypeApi = new MedicalTypesApi(customConfiguration());

export const getMovements = createAsyncThunk(
  "pharmacy/getMovements",
  async (_, thunkApi) => {
    try {
      const result = await firstValueFrom(wrapper(() => api.getMovements()));
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getMovementTypes = createAsyncThunk(
  "pharmacy/movementTypes",
  async (_, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => movementTypeApi.getMedicalDsrStockMovementType())
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getWardMovements = createAsyncThunk(
  "pharmacy/getWardMovements",
  async (payload: { wardCode: string; from?: Date; to?: Date }, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() =>
          wardStockApi.getMovementWard({
            ...payload,
            from: payload.to ?? new Date("2010-12-25T10:30:00Z"),
            to: payload.from ?? new Date(),
          } as any as GetMovementWardRequest)
        )
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getWardMedicals = createAsyncThunk(
  "pharmacy/getWardMedicals",
  async ({ wardCode }: { wardCode: string }, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() =>
          wardStockApi.getMedicalsWard({
            wardCode,
          })
        )
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const chargeMovements = createAsyncThunk(
  "pharmacy/chargeMovements",
  async (payload: NewMultipleChargingMovementsRequest, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => api.newMultipleChargingMovements(payload))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getMedicals = createAsyncThunk(
  "pharmacy/getMedicals",
  async (_, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => medicalApi.getMedicals({}))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getMedicalTypes = createAsyncThunk(
  "pharmacy/getMedicalTypes",
  async (_, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => medicalTypeApi.getMedicalTypes({}))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getMedical = createAsyncThunk(
  "pharmacy/getMedical",
  async (payload: GetMedicalRequest, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => medicalApi.getMedical(payload))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const newMedical = createAsyncThunk(
  "pharmacy/newMedical",
  async (payload: NewMedicalRequest, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => medicalApi.newMedical(payload))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const updateMedical = createAsyncThunk(
  "pharmacy/updateMedical",
  async (payload: UpdateMedicalRequest, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => medicalApi.updateMedical(payload))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

// export const dischargeMovements = createAsyncThunk(
//   "pharmacy/dischargeMovements",
//   async (payload: NewMultipleDischargingMovementsRequest, thunkApi) => {
//     try {
//       const result = await firstValueFrom(
//         wrapper(() => api.newMultipleDischargingMovements(payload))
//       );
//       return result;
//     } catch (error: any) {
//       return thunkApi.rejectWithValue(error.response);
//     }
//   }
// );

export const dischargeMovements = createAsyncThunk<
  boolean, // type du retour
  { ref: string; movementDTO: MovementDTO[] }, // payload attendu
  { rejectValue: any }
>("pharmacy/dischargeMovements", async (payload, thunkApi) => {
  try {
    const request: NewMultipleDischargingMovementsRequest = {
      ref: payload.ref,
      movementDTO: payload.movementDTO,
    };

    const result = await firstValueFrom(
      wrapper(() => api.newMultipleDischargingMovements(request))
    );
    return result;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});

export const newMovementWard = createAsyncThunk<
  boolean,
  MovementWardDTO,
  { rejectValue: any }
>("pharmacy/newMovementWard", async (payload, thunkApi) => {
  try {
    const result = await firstValueFrom(
      wrapper(() =>
        wardStockApi.newMovementWard({
          movementWardDTO: payload,
        })
      )
    );

    return result;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response);
  }
});
