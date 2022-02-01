export interface Props {
  message?: string
}
export function Error({ message }: Props) {
  return (
    <div className="flex items-center h-full">
      <h3 className="text-rigth text-gray-600">
        <strong className="text-2xl text-red-500">Whooops!</strong>
        <br />
        {message || "Erro ao carregar os dados, tente novamente mais tarde."}
      </h3>
    </div>
  )
}