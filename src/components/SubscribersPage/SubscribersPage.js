import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateVisibilityAddSubscriberModal, actionUpdateListOfSubscribers } from "../../actions/actionsSubscribers";
import { fetchSubscribers } from "../../firebase";
import dayjs from "dayjs";

/* Components MUI */
import { Fab, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

/* Components custom */
import DatagridRowMenu from "../DatagridSubscribersRowMenu/DatagridSubscribersRowMenu";
import ModalAddSubscriber from "../ModalAddSubscriber/ModalAddSubscriber";
import NavBar from "../NavBar/NavBar";

/* Style */
import { styleAddButton } from "../../style";

/* Definition */
const SubscribersPage = () => {
  const dispatch = useDispatch();
  const listOfSubscribers = useSelector((state) => state.subscribers.listOfSubscribers);
  const handleOpenAddModal = () => dispatch(actionUpdateVisibilityAddSubscriberModal(true));
  const updateListOfSubscribers = (subscribers) => {
    dispatch(actionUpdateListOfSubscribers(subscribers));
  };
  useEffect(() => {
    fetchSubscribers(updateListOfSubscribers);
  }, []);
  const rows = listOfSubscribers;
  const columns = [
    {
      field: "menu",
      headerName: "",
      width: 80,
      align: "center",
      editable: false,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return <DatagridRowMenu subscriberData={row} />;
      },
    },
    { field: "id", headerName: "ID", headerAlign: "center" },
    {
      field: "firstName",
      headerName: "Prénom",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Nom",
      width: 120,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "sex",
      headerName: "Sexe",
      width: 50,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "dateOfBirth",
      headerName: "Date de naissance",
      width: 150,
      align: "center",
      editable: false,
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row.dateOfBirth) {
          let formattedDate = dayjs.unix(row.dateOfBirth.seconds).format("DD/MM/YYYY");
          return <>{formattedDate}</>;
        } else return <></>;
      },
    },
    {
      field: "phone",
      headerName: "Tél.",
      width: 100,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "licenceNumber",
      headerName: "N° licence",
      width: 100,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
  ];
  //console.log("listOfSubscribers => ", listOfSubscribers);
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: "1rem" }}>
        <NavBar />
      </Grid>
      <Grid item xs={12} sx={{ ml: "1rem", mb: "1rem" }}>
        <Fab
          size="small"
          aria-label="add"
          sx={{
            transition: ".5s",
            "&:hover": {
              ...styleAddButton,
            },
          }}
          onClick={handleOpenAddModal}
        >
          <Add />
        </Fab>
      </Grid>
      <Grid item xs={12} sx={{ mb: "1rem" }}>
        <DataGrid
          sx={{ height: 800, width: "100%" }}
          componentsProps={{
            pagination: {
              labelRowsPerPage: "Résultats par page",
            },
          }}
          rows={rows}
          columns={columns}
          labelRowsPerPage="Your text"
          disableSelectionOnClick
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </Grid>
      <ModalAddSubscriber listOfSubscribers={listOfSubscribers} updateListOfSubscribers={updateListOfSubscribers} />
    </Grid>
  );
};

export default SubscribersPage;
