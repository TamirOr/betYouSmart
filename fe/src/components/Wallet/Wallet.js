import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

const useStyles = makeStyles(styles);

export default function Wallet() {
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>How To Create New Wallet</h4>
                            <p className={classes.cardCategoryWhite}>MetaMask wallet</p>
                        </CardHeader>
                        <CardBody>
                            <p>For security purposes, we have isolated the possibility of creating a cryptographic
                                wallet from the site.
                            </p>
                            <p>
                            </p>
                            <p>
                                All contracts on the site know how to interface with a meta-mask wallet.
                                Please <a title="meta-mask" href="https://metamask.io/" target="_blank"
                                          rel="noopener">click here</a> to create a new wallet.</p>
                            <hr/>
                            <h4 className="m-b-10">Important!</h4>
                            <p>
                                Do not share your verification passwords with anyone, keep them well in a place only
                                you know and know.<br/><br/><br/>
                            </p>
                            <p>
                                Good luck, <br/> And Welcome to the world of liberty, <br/>
                                Bet You Smart team.
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
