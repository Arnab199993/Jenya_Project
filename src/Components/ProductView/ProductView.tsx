import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { singleProductView } from "../../Redux/ProductSlice";
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
  Box,
} from "@mui/material";

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date().toISOString();

  const { singleProductData, loading, error } = useSelector(
    (state: any) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(singleProductView(id));
    }
  }, [id, dispatch]);

  const product = singleProductData;
  console.log("producttt", product);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && product && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Field</strong>
                </TableCell>
                <TableCell>
                  <strong>Value</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{product.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Availability</TableCell>
                <TableCell>{product.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discount</TableCell>
                <TableCell>{product.discountPercentage}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Images</TableCell>
                <TableCell>
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "No image available"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Customer Reviews
        </Typography>

        <Box mb={2} border={1} borderRadius="8px" p={2}>
          {product?.reviews?.map((review: any) => (
            <Typography variant="body1" fontWeight="bold">
              {review?.comment}
              {new Date(review?.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          ))}
        </Box>
      </Box>
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        color="primary"
        onClick={() => navigate("/home")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default ProductView;
