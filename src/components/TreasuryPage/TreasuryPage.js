import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionUpdateCurrentEntryId,
  actionUpdatePopoverMemo,
  actionUpdatePopoverSubscribers,
  actionUpdateVisibilityAddEntryModal,
} from "../../actions/actionsTreasury";
import { fetchEntries } from "../../firebase";
import dayjs from "dayjs";

/* Components MUI */
import { Fab, Grid, ListItem, ListItemText, Popover, Typography } from "@mui/material";
import { Add, Article, People } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

/* Components custom */
import DatagridTreasuryRowMenu from "../DatagridTreasuryRowMenu/DatagridTreasuryRowMenu";
import ModalAddEntry from "../ModalAddEntry/ModalAddEntry";
import ModalEditEntry from "../ModalEditEntry/ModalEditEntry";
import ModalDeleteEntry from "../ModalDeleteEntry/ModalDeleteEntry.js";
import NavBar from "../NavBar/NavBar";

/* Style */
import { colors, styleAddButton } from "../../style";

/* Definition */
const TreasuryPage = () => {
  const dispatch = useDispatch();

  // HOVERS //
  const [anchorElSubscribersHover, setAnchorElSubscribersHover] = useState(null);
  const [anchorElMemoHover, setAnchorElMemoHover] = useState(null);
  const hoverSubscribersArray = useSelector((state) => state.treasury.hoverSubscribers);
  const hoverMemo = useSelector((state) => state.treasury.hoverMemo);
  const hoverSubscribers = hoverSubscribersArray.map((el, index) => {
    return (
      <ListItem key={`ListItem-Concerned-Subscriber-${index}`}>
        <ListItemText primary={el} />
      </ListItem>
    );
  });
  const handleHoverSubscribers = (e, entryData) => {
    if (!entryData.subscribers || entryData.subscribers.length === 0) return;
    let concernedSubscribers = entryData.subscribers.split("/");
    concernedSubscribers.pop();
    dispatch(actionUpdatePopoverSubscribers(concernedSubscribers));
    setAnchorElSubscribersHover(e.currentTarget);
  };
  const handleNoHoverSubscribers = () => {
    setAnchorElSubscribersHover(null);
  };
  const openedSubscribersPopover = Boolean(anchorElSubscribersHover);
  const openedMemoPopover = Boolean(anchorElMemoHover);

  const handleHoverMemo = (e, entryData) => {
    if (entryData.memo.length === 0) return;
    dispatch(actionUpdatePopoverMemo(entryData.memo));
    setAnchorElMemoHover(e.currentTarget);
  };
  const handleNoHoverMemo = () => {
    setAnchorElMemoHover(null);
  };
  // END HOVERS //

  const listOfEntries = useSelector((state) => state.treasury.listOfEntries);
  const handleOpenAddModal = () => dispatch(actionUpdateVisibilityAddEntryModal(true));

  const handleClickRowMenu = (entryId) => {
    dispatch(actionUpdateCurrentEntryId(entryId));
  };

  const rows = listOfEntries.map((entry, index) => {
    let formattedSubscribers = "";
    if (entry.subscribers) {
      entry.subscribers.forEach((subscriber) => {
        formattedSubscribers = `${formattedSubscribers}${subscriber.firstName} ${subscriber.name}/`;
      });
      return { ...entry, subscribers: formattedSubscribers };
    } else return { ...entry };
  });

  const columns = [
    {
      field: "menu",
      headerName: "",
      width: 80,
      align: "center",
      editable: false,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return <DatagridTreasuryRowMenu entryId={row.id} onClickRowMenu={handleClickRowMenu} />;
      },
    },
    { field: "id", headerName: "ID", headerAlign: "center" },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paymentMethod",
      headerName: "Moyen de paiement",
      width: 150,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "nature",
      headerName: "Nature",
      width: 120,
      align: "center",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Montant",
      width: 100,
      align: "right",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      align: "center",
      editable: false,
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row.date) {
          let formattedDate = dayjs.unix(row.date.seconds).format("DD/MM/YYYY");
          return <>{formattedDate}</>;
        } else return <></>;
      },
    },
    {
      field: "subscribers",
      headerName: "Inscrits concernés",
      width: 150,
      align: "center",
      editable: false,
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (!row.subscribers || row.subscribers.length === 0) return;
        return (
          <>
            <People
              sx={{ color: colors.mainBlue }}
              onMouseEnter={(e) => {
                handleHoverSubscribers(e, row);
              }}
              onMouseLeave={(e) => {
                handleNoHoverSubscribers(e, row);
              }}
            />
          </>
        );
      },
    },
    {
      field: "memo",
      headerName: "Memo",
      width: 80,
      align: "center",
      editable: false,
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (!row.memo || row.memo.length === 0) return;
        return (
          <>
            <Article
              sx={{ color: colors.mainBlue }}
              onMouseEnter={(e) => {
                handleHoverMemo(e, row);
              }}
              onMouseLeave={(e) => {
                handleNoHoverMemo(e, row);
              }}
            />
          </>
        );
      },
    },
  ];

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
      <Popover
        sx={{
          pointerEvents: "none",
          wordWrap: "break-word",
        }}
        open={openedSubscribersPopover}
        anchorEl={anchorElSubscribersHover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transitionDuration={300}
        onClose={handleNoHoverSubscribers}
        disableRestoreFocus
      >
        {hoverSubscribers}
      </Popover>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={openedMemoPopover}
        anchorEl={anchorElMemoHover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transitionDuration={300}
        onClose={handleNoHoverMemo}
        disableRestoreFocus
        PaperProps={{
          sx: { maxWidth: "300px" },
        }}
      >
        <Typography variant="body2" sx={{ padding: "1rem", wordWrap: "break-word" }}>
          {hoverMemo}
        </Typography>
      </Popover>
      <ModalAddEntry />
      <ModalEditEntry />
      <ModalDeleteEntry />
    </Grid>
  );
};

export default TreasuryPage;
