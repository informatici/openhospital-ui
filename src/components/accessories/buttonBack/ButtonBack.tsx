import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { IProps } from "./types";

const ButtonBack: FunctionComponent<IProps> = ({
    label
}) => {
    const { t } = useTranslation();
    const naviagte = useNavigate();

    const handleClick = () => {
        naviagte(-1);
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