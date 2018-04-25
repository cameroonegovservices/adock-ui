La base de données doit contenir une factory qui peut être ajoutée via la commande ``manage.py shell_plus`` :

```python
from adock.transporteurs import factories
Transporteur.objects.get(pk='80005226884728').delete()
factories.TransporteurFactory(
  raison_sociale='A DOCK TRANSPORTEUR',
  siret='80005226884728')
```
