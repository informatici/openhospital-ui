import React, { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import { IState } from "../../../types";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./styles.scss";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { getPrices } from "../../../state/prices/actions";
import { newBill, newBillReset } from "../../../state/bills/actions";
import {
  IDispatchProps,
  IStateProps,
  TProps,
  TActivityTransitionState,
} from "./types";
import DrawerActivity from "./DrawerActivity";
import {
  BillDTO,
  BillItemsDTO,
  FullBillDTO,
  PatientDTO,
} from "../../../generated";
import TextField from "@material-ui/core/TextField";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

//management message increase/decrease items in the bill
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//end management

const NewBillActivity: FunctionComponent<TProps> = ({
  userCredentials,
  prices,
  getPrices,
  newBill,
  newBillReset,
  hasFailed,
  hasSucceeded,
  isLoading,
  dashboardRoute,
}) => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
    [t("nav.newbill")]: "/bills",
  };

  //get prices/list
  useEffect(() => {
    getPrices();
  }, []);

  const [items, setItems] = React.useState<BillItemsDTO[]>([]);

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  const [billComplete, setBillComplete] = useState(false);

  useEffect(() => {
    if (
      activityTransitionState === "TO_BILL_HOME" ||
      activityTransitionState === "TO_DASHBOARD"
    ) {
      newBillReset();
    }
  }, [activityTransitionState]);

  //  //  //  //  //
  //  GET TOKEN   //
  //  //  //  //  //
  const [token_auth, setToken] = useState("");
  useEffect(() => {
    const url =
      "https://www.open-hospital.org/oh11-api/auth/login?password=admin&username=admin";
    const cont_t = "application/json";
    const acc = "*/*";

    const fetchDataTok = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": cont_t, Accept: acc },
        });
        const json = await response.json();
        setToken(json.token);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataTok();
  }, []);

  //  //  //  //  //
  //  GET PATIENT //
  //  //  //  //  //
  const [pat, setPatient] = useState<PatientDTO>();
  const getPat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const url = "https://www.open-hospital.org/oh11-api/patients?page=1&size=1";
    const auth = "Bearer " + token_auth;
    const acc = "application/json";

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: acc, Authorization: auth },
        });
        const json = await response.json();
        setPatient(json[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  const patient_data = pat?.firstName + " " + pat?.secondName;

  const [createBill, setCreateBill] = React.useState<BillDTO>();

  //GET DATE
  const [date, setDate] = useState("");
  const get_date = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setDate(e.currentTarget.value);
  };

  //Set patient and date
  useEffect(() => {
    if (date !== undefined && pat !== undefined)
      setCreateBill({
        id: 0,
        list: true,
        listId: 0,
        patient: true,
        patientDTO: pat,
        date: date,
        update: date,
        listName: "Basic",
        patName: pat?.firstName + " " + pat?.secondName,
        status: "O",
        amount: 1000,
        balance: 1500,
        user: "admin",
      });
  }, [date, pat]);

  //  //  //  //  //
  // CREATE BILL  //
  //  //  //  //  //
  const [fullBill, setFullBill] = React.useState<FullBillDTO>();
  useEffect(() => {
    if (createBill !== undefined && items !== undefined) {
      setFullBill({
        billDTO: createBill,
        billItemsDTO: items,
        billPaymentsDTO: [],
      });
    }
  }, [createBill, items]);

  const [openConferm, setOpenConferm] = useState(false);
  const handleClickOpenConferm = () => {
    setOpenConferm(true);
  };
  const handleCloseConferm = () => {
    setOpenConferm(false);
  };

  //  //  //  //  //
  //  DELETE ITEM //
  //  //  //  //  //
  const delete_item = (e: BillItemsDTO) => {
    setItems(items.filter((item) => e !== item));
  };

  const test = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("hello patient");
  };

  //  //  //  //  //
  //  SAVE BILL   //
  //  //  //  //  //
  const saveBill = () => {
    if (fullBill !== undefined && items.length !== 0) setBillComplete(true);
  };

  useEffect(() => {
    if (billComplete === true && fullBill !== undefined) newBill(fullBill);
  }, [billComplete, fullBill]);

  //Increase Items
  const [confirmInc, setConfirmInc] = useState(false);
  const [confirmDec, setDecIt] = useState(false);

  useEffect(() => {
    if (items !== undefined) {
    }
  }, [items]);

  const incrementItem = (e: BillItemsDTO) => {
    if (e.itemQuantity !== undefined) {
      ++e.itemQuantity;
      setConfirmInc(true);
    }
  };

  const decrementItem = (e: BillItemsDTO) => {
    if (e.itemQuantity !== undefined) {
      --e.itemQuantity;
    }
  };

  //  //  //  //  //  //  //
  // Success inc/dec item //
  // //  //  //  //  //  //
  const classes = useStyles();
  const [openMessage, setOpenMessage] = React.useState(false);

  const handleClickChangePlus = (e: BillItemsDTO) => {
    setOpenMessage(false);
    if (e.itemQuantity !== undefined) ++e.itemQuantity;
    setOpenMessage(true);
  };

  const handleClickChangeMinus = (e: BillItemsDTO) => {
    setOpenMessage(false);
    if (e.itemQuantity !== undefined) {
      if (e.itemQuantity > 1) --e.itemQuantity;
      else {
        delete_item(e);
      }
    }
    setOpenMessage(true);
  };

  const handleCloseChange = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  switch (activityTransitionState) {
    case "TO_DASHBOARD":
      return <Redirect to={dashboardRoute} />;
    case "TO_BILL_HOME":
      return <Redirect to="/billing" />;
    default:
      return (
        <div className="new_Bill">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="newBill__background">
            <div className="newBill__content">
              <div className="newBill__title">{t("nav.newbill")}</div>
              <div className="newBill__panel">
                <div className="billPanel">
                  <form>
                    <div className="newBill_Head">
                      <div className="newBill_Date_Pat">
                        <TextField
                          className="bill_Date"
                          id="date"
                          label="SELECT DATE"
                          type="date"
                          defaultValue=""
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => get_date(e)}
                        />
                        <Button
                          type="submit"
                          className="bill_SelectPat"
                          onClick={(e) => getPat(e)}
                          variant="outlined"
                        >
                          find Patient
                        </Button>
                      </div>
                      <div className="newBill_InputPat">
                        <label>Patient</label>
                        <span></span>
                        <input
                          className="patient_input"
                          value={patient_data}
                          disabled
                        ></input>
                        <Button
                          className="buttonBillSubmit"
                          onClick={handleClickOpenConferm}
                        >
                          SAVE
                        </Button>
                      </div>
                    </div>
                    <div className="newBill_Rows">
                      <TableContainer className="tableDrawer" component={Paper}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Description</TableCell>
                              <TableCell>Id</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Qty</TableCell>
                              <TableCell>Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {items?.map((x, y) => {
                              return (
                                <TableRow>
                                  <TableCell>{x.itemDescription}</TableCell>
                                  <TableCell>{x.hashCode}</TableCell>
                                  <TableCell>{x.itemAmount}</TableCell>
                                  <TableCell>
                                    {x.itemQuantity}
                                    <Button
                                      onClick={() => handleClickChangePlus(x)}
                                    >
                                      <AddIcon></AddIcon>
                                    </Button>
                                    <Button
                                      onClick={() => handleClickChangeMinus(x)}
                                    >
                                      <RemoveIcon></RemoveIcon>
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Button onClick={() => delete_item(x)}>
                                      <HighlightOffIcon></HighlightOffIcon>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </form>
                </div>
                <div className="bill_Drawer">
                  <DrawerActivity
                    prices={prices}
                    items={items}
                    setItems={setItems}
                  />
                  <Dialog
                    open={openConferm}
                    onClose={handleCloseConferm}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Confirm Message
                    </DialogTitle>
                    <Button color="primary" size="large" onClick={saveBill}>
                      Confirm
                    </Button>
                    <Button
                      color="secondary"
                      size="large"
                      onClick={handleCloseConferm}
                    >
                      Cancel
                    </Button>
                    <DialogContent>
                      <div style={{ height: 30, width: 250 }}></div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={hasSucceeded}
            title="Bill Created"
            icon={checkIcon}
            info={"The bill registration was successful"}
            primaryButtonLabel={t("common.dashboard")}
            secondaryButtonLabel={"Bill Dashboard"}
            handlePrimaryButtonClick={() =>
              setActivityTransitionState("TO_DASHBOARD")
            }
            handleSecondaryButtonClick={() =>
              setActivityTransitionState("TO_BILL_HOME")
            }
          />
          <Snackbar
            open={openMessage}
            autoHideDuration={2000}
            onClose={handleCloseChange}
          >
            <Alert onClose={handleCloseChange} severity="success">
              Action Confirmed
            </Alert>
          </Snackbar>
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  prices: state.prices.getPrices.data,
  isLoading: state.bills.newBill.status === "LOADING",
  hasSucceeded: state.bills.newBill.status === "SUCCESS",
  hasFailed: state.bills.newBill.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  getPrices,
  newBill,
  newBillReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBillActivity);
