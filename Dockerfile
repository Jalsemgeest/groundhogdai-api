FROM gcr.io/google_appengine/nodejs

# Copy application code.
COPY . /app/

RUN install_node v6.6.0

# Install dependencies.
RUN npm --unsafe-perm install

CMD npm start
