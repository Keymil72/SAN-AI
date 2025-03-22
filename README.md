# SAN-AI

Discord Bot do przetwarzania, akceptacji (Wyznaczona rola) i wstawiania newsów IT na wyznaczonych kanałach discorda.

Bot ten integruje się z bazą danych, który przesyła newsy i umożliwia ich akceptację lub odrzucenie przez administratora w celu ich publikacji na kanale Discord w połączeniu z web scrapperem umożliwa pozyskiwanie najwowszych informacji z wyznaczonych stron.

## Funkcjonalności

- **Akceptacja newsów**: Administratorzy mogą zaakceptować lub odrzucić pobrane newsy bezpośrednio na Discordzie.
- **Integracja z Discord**: Komendy i reakcje są zarządzane bezpośrednio w aplikacji Discord, gdzie administratorzy mogą łatwo akceptować newsy.
- **Dynamiczne dodawanie newsów**: Nowe newsy są przesyłane do specjalnego kanału na Discordzie z odpowiednią reakcją do akceptacji.

## Wymagania

- **Node.js** (w wersji 20 lub wyższej)
- **Discord API token**: Wymagany token bota do połączenia z Discordem.
- **Dostęp do bazy danych**: Bot korzysta z bazy danych PostgreSQL do przechowywania newsów i ich statusów.
- **Pakiety Node.js**:
  - `discord.js` (integracja z Discordem)
  - `pg` i `kysely` (obsługa bazy danych PostgreSQL i query builder)
  - `fs` (operacje na systemie plików)
  - `Jest` (unit testy)
  - `node-cron` (harmonogramowanie zadań)
  - `path` (operacje na ścieżkach plików)
  - `moment-timezone` (formatowanie dat)

## Instalacja

1. **Pobierz repozytorium**:

   ```bash
   git clone https://github.com/Keymil72/SAN-AI.git
   cd SAN-AI
   ```

2. **Instalacja zależności**:

   ```bash
   npm install
   ```

3. **Konfiguracja bot'a**:
   - Zmień nazwę `src/config.json.example` na `src/config.json`.
   - Zmień nazwę `src/newsConfig.json.example` na `src/newsConfig.json`.
   - Zmień nazwę `postgreSQL/docker-compose.yml.example` na `postgreSQL/docker-compose.yml`.
   - Wypełnij wymagane pola w `src/config.json`, `src/newsConfig.json` i `postgreSQL/docker-compose.yml`.

4. **Uruchamianie bot'a**:

   ```bash
   node .
   ```

   lub

   ```bash
   node src/Main.js
   ```

## Autor
>
> **Created by [Keymil72](https://keymil72.pl)**
[![GitHub](https://img.shields.io/badge/GitHub-Keymil72-blue?%230b4499=github)](https://github.com/Keymil72)
