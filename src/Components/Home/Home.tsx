import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  ProductItem,
} from "../../Redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Modal,
  Box,
  TextField,
  DialogActions,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: products,
    loading,
    error,
  } = useSelector((state: any) => state.product);

  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(
    null
  );

  const [openModal, setOpenModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<ProductItem | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdate = (product: ProductItem) => {
    setEditingProduct(product);
    setUpdatedProduct({ ...product });
    setOpenModal(true);
  };

  const handleSaveUpdate = () => {
    console.log("updatedProducttt", updatedProduct?.id);
    if (updatedProduct) {
      dispatch(updateProduct(updatedProduct?.id));
      setOpenModal(false);
      setEditingProduct(null);
      setUpdatedProduct(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedProduct) {
      setUpdatedProduct({
        ...updatedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product Table
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Price ($)</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Rating</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category || "N/A"}</TableCell>
                  <TableCell>{product.rating || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/productView/${product.id}`)}
                    >
                      View
                    </Button>
                    <Button onClick={() => handleUpdate(product)}>Edit</Button>
                    <Button onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="edit-product-modal"
        aria-describedby="modal-to-edit-product-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Product
          </Typography>
          {updatedProduct && (
            <>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="title"
                value={updatedProduct.title}
                onChange={handleChange}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                name="category"
                value={updatedProduct.category || ""}
                onChange={handleChange}
              />
              <TextField
                label="Rating"
                variant="outlined"
                fullWidth
                margin="normal"
                name="rating"
                value={updatedProduct.rating || ""}
                onChange={handleChange}
              />
              <DialogActions>
                <Button onClick={() => setOpenModal(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSaveUpdate} color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
