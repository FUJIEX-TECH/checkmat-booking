# Webhook — Checkmat Booking → Rollcall

## Endpoint que receberá os dados

```
POST https://rollcall-backend-production.up.railway.app/api/lead
```

## Headers

```
Content-Type: application/json
```

## Payload (JSON)

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+15551234567",
  "lead_id": "abc123",
  "scheduled_at": "2026-05-25T18:00:00.000Z",
  "source": "manual_booking_page",
  "utm_source": "meta",
  "utm_campaign": "checkmat-brentwood-maio"
}
```

## Descrição dos campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome completo do lead |
| `email` | string | E-mail do lead |
| `phone` | string | Telefone (formato internacional) |
| `lead_id` | string | ID do lead vindo do Meta Ads / URL param |
| `scheduled_at` | string (ISO 8601) | Data/hora do agendamento em UTC |
| `source` | string | Sempre `"manual_booking_page"` |
| `utm_source` | string | UTM de origem (ex: `"meta"`) |
| `utm_campaign` | string | UTM de campanha |

## Quando é disparado

- Evento `BOOKING_CREATED` no Cal.com (novo agendamento)
- Evento `BOOKING_RESCHEDULED` no Cal.com (reagendamento)

## Observações

- `phone` e `lead_id` são opcionais — dependem de o usuário ter chegado via formulário do Meta Ads com esses dados na URL
- `scheduled_at` está sempre em **UTC** (timezone America/Los_Angeles deve ser aplicado na exibição pelo agente)
- O endpoint deve retornar qualquer status `2xx` — erros são logados mas não bloqueiam o agendamento
