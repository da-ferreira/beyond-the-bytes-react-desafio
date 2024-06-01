import { AddressCard } from './components/address-card';
import { Button } from './components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useRef, useState } from 'react';
import { Address } from './@types/address';

export function App() {
  const labelName = useRef<HTMLInputElement>(null);
  const fullAddress = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const batch = useRef<HTMLInputElement>(null);
  const [selectedLocality, setSelectedLocality] = useState<string>('earth');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

  const createAddress = async () => {
    const newId = addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;

    setAddresses([
      ...addresses,
      {
        id: newId,
        labelName: String(labelName.current?.value),
        fullAddress: String(fullAddress.current?.value),
        city: String(city.current?.value),
        country: String(country.current?.value),
        batch: String(batch.current?.value),
        type: selectedLocality,
      },
    ]);
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleAddressEditDialog = (id: number) => {
    const addressEditItem = addresses.find((address) => address.id === id);

    if (addressEditItem) {
      setOpen(true);

      setAddressToEdit(addressEditItem);

      labelName.current.value = addressEditItem.labelName;
      fullAddress.current.value = addressEditItem.fullAddress;
      country.current.value = addressEditItem.country;
      city.current.value = addressEditItem.city;
      batch.current.value = addressEditItem.batch;
    }
  };

  const editAddress = () => {
    if (addressToEdit) {
      setAddresses(
        addresses.map((address) =>
          address.id === addressToEdit.id
            ? {
                ...address,
                labelName: labelName.current ? labelName.current.value : address.labelName,
                fullAddress: fullAddress.current ? fullAddress.current.value : address.fullAddress,
                city: city.current ? city.current.value : address.city,
                country: country.current ? country.current.value : address.country,
                batch: batch.current ? batch.current.value : address.batch,
              }
            : address
        )
      );
      setOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 flex justify-end">
        {/* Modal Criação */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar novo endereço</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Adicione um novo endereço</DialogTitle>
              <DialogDescription>Clique em criar quando terminar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Apelido
                </Label>
                <Input id="labelName" ref={labelName} className="col-span-6" />
              </div>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Localidade
                </Label>
                <Select
                  value={selectedLocality}
                  onValueChange={(value) => {
                    setSelectedLocality(value);
                  }}
                >
                  <SelectTrigger className="w-[490.91px]">
                    <SelectValue placeholder="Marte ou Terra?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="earth">Terra</SelectItem>
                      <SelectItem value="mars">Marte</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {selectedLocality === 'earth' ? (
                <>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="country" className="text-left">
                      País
                    </Label>
                    <Input id="country" ref={country} className="col-span-6" />
                  </div>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="city" className="text-left">
                      Cidade
                    </Label>
                    <Input id="city" ref={city} className="col-span-6" />
                  </div>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="fullAddress" className="text-left">
                      Logradouro
                    </Label>
                    <Input id="fullAddress" ref={fullAddress} className="col-span-6" />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="batch" className="text-left">
                    Lote
                  </Label>
                  <Input id="batch" ref={batch} className="col-span-6" type="number" max={9999} min={1000} />
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={createAddress}>
                  Criar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal Edição */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edite um endereço</DialogTitle>
              <DialogDescription>Clique em salvar quando terminar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="editLabelName" className="text-left">
                  Apelido
                </Label>
                <Input
                  id="editLabelName"
                  ref={labelName}
                  className="col-span-6"
                  defaultValue={addressToEdit?.labelName}
                />
              </div>

              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Localidade
                </Label>

                <Input
                  id="editCountry"
                  className="col-span-6"
                  defaultValue={selectedLocality === 'earth' ? 'Terra' : 'Marte'}
                  readOnly
                />
              </div>

              {selectedLocality === 'earth' ? (
                <>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="editCountry" className="text-left">
                      País
                    </Label>
                    <Input
                      id="editCountry"
                      ref={country}
                      className="col-span-6"
                      defaultValue={addressToEdit?.country}
                    />
                  </div>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="editCity" className="text-left">
                      Cidade
                    </Label>
                    <Input id="editCity" ref={city} className="col-span-6" defaultValue={addressToEdit?.city} />
                  </div>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="editFullAddress" className="text-left">
                      Logradouro
                    </Label>
                    <Input
                      id="editFullAddress"
                      ref={fullAddress}
                      className="col-span-6"
                      defaultValue={addressToEdit?.fullAddress}
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="batchEdit" className="text-left">
                    Lote
                  </Label>
                  <Input
                    id="batchEdit"
                    ref={batch}
                    defaultValue={addressToEdit?.batch}
                    className="col-span-6"
                    type="number"
                    max={9999}
                    min={1000}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button color="secondary" variant="outline" onClick={() => setOpen(false)}>
                  Fechar
                </Button>
              </DialogClose>
              <Button type="submit" onClick={editAddress}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.map((address) => (
        <AddressCard
          fullAddress={address.fullAddress}
          label={address.labelName}
          city={address.city}
          country={address.country}
          className="mb-2"
          onDelete={() => deleteAddress(address.id)}
          onEdit={() => handleAddressEditDialog(address.id)}
          type={address.type}
          batch={address.batch}
        />
      ))}
    </div>
  );
}
