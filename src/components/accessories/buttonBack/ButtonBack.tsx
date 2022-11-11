import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import Button from "../button/Button";
import { IProps } from "./types";

const ButtonBack: FunctionComponent<IProps> = ({
    label
}) => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    }

    if (!label || label.length == 0) {
        label = t("common.back");
    }

    return (
        <Button
            type="button"
            variant="text"
            disabled={false}
            onClick = {handleClick}
        >
           <ArrowBackIos /> {label}
        </Button>
    );
}

export default ButtonBack;