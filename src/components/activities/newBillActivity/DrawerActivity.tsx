import React, { FunctionComponent, useEffect, useState } from "react";
import { DataGrid, GridRowId } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { PricesState } from "./types";
import "./styles.scss";

const DrawerActivity: FunctionComponent<PricesState> = ({
    prices,
    items,
    setItems,
}) => {

    const [open_med, setOpen_med] = React.useState(false);
    const [open_ope, setOpen_ope] = React.useState(false);
    const [open_exa, setOpen_exa] = React.useState(false);
    const [open_oth, setOpen_oth] = React.useState(false);
    const [open_cust, setOpen_cust] = React.useState(false);

    //
    //management open/close modals
    //
    const handleClickOpen_med = () => {
        setOpen_med(true);
    };
    const handleClose_med = () => {
        setOpen_med(false);
    };

    const handleClickOpen_ope = () => {
        setOpen_ope(true);
    };
    const handleClose_ope = () => {
        setOpen_ope(false);
    };

    const handleClickOpen_exa = () => {
        setOpen_exa(true);
    };
    const handleClose_exa = () => {
        setOpen_exa(false);
    };

    const handleClickOpen_oth = () => {
        setOpen_oth(true);
    };
    const handleClose_oth = () => {
        setOpen_oth(false);
    };

    const handleClickOpen_cust = () => {
        setOpen_cust(true);
    };
    const handleClose_cust = () => {
        setOpen_cust(false);
    };

    //
    //management modals' columns and rows
    //
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'group',
            headerName: 'Group',
            width: 125,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 170,
            editable: true,
        },
    ];

    type Row = [{
        id: number | undefined,
        group: string | undefined,
        description: string | undefined
    }];

    //this catches the ids of the prices (because the row's id is the relative id of the item in prices) 
    const [select, setSelect] = React.useState<GridRowId[]>();

    //create rows for MED
    let rows_med: Row = [{ id: 0, group: '', description: '' }];

    prices?.map((m, i) => {
        if (m.group === "MED")
            rows_med.push({ id: m.id, group: m.group, description: m.list?.description })
    })
    rows_med?.shift(); //delete the first row used for definition

    //create rows for OPE
    let rows_ope: Row = [{ id: 0, group: '', description: '' }];

    prices?.forEach(function (m, i) {
        if (m.group === "OPE")
            rows_ope.push({ id: m.id, group: m.group, description: m.list?.description })
    })
    rows_ope?.shift(); //delete the first row used for definition

    //create rows for EXA
    let rows_exa: Row = [{ id: 0, group: '', description: '' }];

    prices?.forEach(function (m, i) {
        if (m.group === "EXA")
            rows_exa.push({ id: m.id, group: m.group, description: m.list?.description })
    })
    rows_exa?.shift(); //delete the first row used for definition

    //create rows for OTH
    let rows_oth: Row = [{ id: 0, group: '', description: '' }];

    prices?.forEach(function (m, i) {
        if (m.group === "OTH")
            rows_oth.push({ id: m.id, group: m.group, description: m.list?.description })
    })
    rows_oth?.shift(); //delete the first row used for definition
    

    //fill the array of Items to send to father who will display them
    const take_items = () => {
        select?.forEach(function (i, j) {
            //if-else case to check if item is already in the bill
            if ((items?.some(it => it.hashCode === i)) === true) {
                items.forEach(function (x) {
                    if(x.itemQuantity !== undefined && x.hashCode === i)
                    {
                        ++x.itemQuantity;
                    }
                })
            }
            else {
                setItems(pre =>
                    [...pre,
                    {
                        "hashCode": prices?.find(p => p.id == i)?.id,
                        "id": 1,
                        "price": true,
                        "billId": 1,
                        "priceId": String(prices?.find(p => p.id == i)?.id),
                        "itemDescription": prices?.find(p => p.id == i)?.list?.description,
                        "itemAmount": prices?.find(p => p.id == i)?.price,
                        "itemQuantity": 1,
                        "itemDisplayCode": "test",
                        "itemId": "1",
                    }])
            }
        })
        setOpen_med(false);
        setOpen_ope(false);
        setOpen_oth(false);
        setOpen_exa(false);
    }

    //
    //Manage Custom insert
    //

    const [description_cust, setDescription_cust] = useState('');
    const [itemQ_cust, setItemQ_cust] = useState(0);


    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        setDescription_cust(e.currentTarget.value);
    }

    const handleItemQ = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        setItemQ_cust(Number(e.currentTarget.value));
    }

    const confirm_cust = () => {
        if (itemQ_cust !== 0 && description_cust !== '')
            setItems(pre =>
                [...pre,
                {
                    "hashCode": 1,
                    "id": 1,
                    "price": true,
                    "billId": 1,
                    "priceId": description_cust,
                    "itemDescription": description_cust,
                    "itemAmount": 1,
                    "itemQuantity": itemQ_cust,
                    "itemDisplayCode": "test",
                    "itemId": "1",

                }])
        else {
            setItemQ_cust(0);
            setDescription_cust('');
        }
        setOpen_cust(false);
    }


    return (
        <List className="billListDrawer">
            <ListItem button key="Medical" onClick={handleClickOpen_med}><AddIcon></AddIcon>Medical</ListItem>
            <Dialog className="billItemDrawer" open={open_med} onClose={handleClose_med} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Select Medical</DialogTitle>
                <Button onClick={take_items}>Confirm</Button>
                <DialogContent>
                    <div style={{ height: 400, width: 450 }}>
                        <DataGrid
                            rows={rows_med}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={e => setSelect(e)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <ListItem button key="Operation" onClick={handleClickOpen_ope}><AddIcon></AddIcon>Operation</ListItem>
            <Dialog open={open_ope} onClose={handleClose_ope} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Select Operation</DialogTitle>
                <Button onClick={take_items} >Confirm</Button>
                <DialogContent>
                    <div style={{ height: 400, width: 450 }}>
                        <DataGrid
                            rows={rows_ope}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={e => setSelect(e)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <ListItem button key="Exam" onClick={handleClickOpen_exa}><AddIcon></AddIcon>Exam</ListItem>
            <Dialog open={open_exa} onClose={handleClose_exa} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Select Exam</DialogTitle>
                <Button onClick={take_items}>Confirm</Button>
                <DialogContent>
                    <div style={{ height: 400, width: 450 }}>
                        <DataGrid
                            rows={rows_exa}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={e => setSelect(e)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <ListItem button key="Other" onClick={handleClickOpen_oth}><AddIcon></AddIcon>Other</ListItem>
            <Dialog open={open_oth} onClose={handleClose_oth} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Select Other</DialogTitle>
                <Button onClick={take_items}>Confirm</Button>
                <DialogContent>
                    <div style={{ height: 400, width: 450 }}>
                        <DataGrid
                            rows={rows_oth}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={e => setSelect(e)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <ListItem button key="Custom" onClick={handleClickOpen_cust}><AddIcon></AddIcon>Custom</ListItem>
            <Dialog open={open_cust} onClose={handleClose_cust} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Insert Custom</DialogTitle>
                <Button onClick={confirm_cust}>Confirm</Button>
                <DialogContent>
                    <div style={{ height: 200, width: 450 }}>
                        <FormControl onSubmit={confirm_cust}>
                            <div className="Description" style={{ marginBottom: 50 }}>
                                <TextField required id="standard-required" label="Description" onChange={e => handleDescription(e)} />
                            </div>
                            <div className="Item_quantity" style={{ marginBottom: 10 }}>
                                <TextField required id="standard-required" label="Item_quantity" type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }} onChange={e => handleItemQ(e)} />
                            </div>
                        </FormControl>
                    </div>
                </DialogContent>
            </Dialog>
        </List>
    )
}


export default DrawerActivity;