ARG VARIANT=22-bookworm
FROM node:${VARIANT}

# Add user `codespace` with uid `1002` to the container.
ARG USERNAME=codespace
RUN useradd --uid 1002 --gid node --shell /bin/bash --create-home ${USERNAME}

# Add NPM global to PATH.
ARG NPM_GLOBAL=/usr/local/share/npm-global
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

ARG NODE_MODULES="eslint @eslint/js typescript typescript-eslint prettier corepack"
RUN \
    # Configure global npm install location, use group to adapt to UID/GID changes
    if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
    # Install eslint and typescript
    && su ${USERNAME} -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

# Install pnpm package manager using corepack
RUN corepack enable \
    && corepack prepare pnpm@10.2.1 --activate

ENTRYPOINT ["/bin/bash"]