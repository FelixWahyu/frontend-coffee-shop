import ReviewTable from "@/components/admin/reviews/ReviewTable";

export default function ReviewsManagementPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Reviews Management</h2>
      <p className="text-gray-500 mb-6">
        Kelola dan pantau seluruh ulasan serta penilaian dari pelanggan
      </p>
      <ReviewTable />
    </div>
  );
}
