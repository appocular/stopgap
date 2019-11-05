
export const statusString = (snapshot) => {
  let status = [snapshot.status]

  if (snapshot.processing_status === 'pending') {
    status.push('needs review');
  }

  if (snapshot.run_status === 'pending') {
    status.push('running');
  }

  return status.join(', ')
}
